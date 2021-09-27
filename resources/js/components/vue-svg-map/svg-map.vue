<template>
<article>
  <svg v-if="Status=='ready'"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="map.viewBox"
    :aria-label="map.label"
    class="svg-map"
  >
    <slot name="before" />

    <path
      v-for="(location, index) in map.locations"
      :id="location.id"
      :key="location.id"
      :name="location.name"
      :d="location.path"
      class="svg-map__location"
      :style="locationStyle(location.id)"
      :location-class="getLocationClass"
      @mouseover="pointLocation"
      @mouseout="unpointLocation"
	  @mousemove="moveOnLocation"
      :class="
        isLocationClassFunction ? locationClass(location, index) : locationClass
      "
      :tabindex="
        isLocationTabindexFunction
          ? locationTabindex(location, index)
          : locationTabindex
      "
      :role="locationRole"
      :aria-label="location.name"
      :aria-checked="isLocationSelected && isLocationSelected(location, index)"
      v-bind="getLocationCustomProperties(location)"
      v-on="$listeners"
    />
    <slot name="after" />
  </svg>

  <div class="tooltip" :style="tooltipStyle" :id="pointedLocation.id">
      <p><span class="tooltip-gray">Регион:</span><br /> {{ pointedLocation.name }}
      <p><span class="tooltip-gray">ПГПЖ:</span><br /> {{ numeral(pointedLocation.PGPJ).format() }}</p>
      <p><span class="tooltip-gray">Численность населения:</span><br /> {{ numeral(pointedLocation.Population).format() }}</p>
      <p><span class="tooltip-gray">Ожидаемая продолжительность жизни:</span><br /> {{ pointedLocation.OPJ }}</p>
  </div>

</article>
</template>

<script>
import {mapGetters} from 'vuex'
import { getLocationName } from '../../utilities'
const LOCATION_DEFAULT_PROPERTIES = ["id", "name", "path"];
import numeral from 'numeral';

export default {
  name: "SvgMap",
  data() {
    return {
        pointedLocation: {Id: null, Name: null, PGPJ: null, Population: null, OPJ: null},
        tooltipStyle: "display:none;",
        numeral: numeral
    }
  },
  props: {
    map: {
      type: Object,
      required: true,
      validator(map) {
        return (
          typeof map.viewBox === "string" &&
          Array.isArray(map.locations) &&
          map.locations.every(
            (location) =>
              typeof location.path === "string" &&
              typeof location.id === "string"
          )
        );
      },
    },
    locationClass: {
      type: [String, Function],
      default: null,
    },
    locationTabindex: {
      type: [String, Function],
      default: null,
    },
    locationRole: {
      type: String,
      default: null,
    },
    isLocationSelected: {
      type: Function,
      default: null,
    },
  },
  computed: {
    isLocationClassFunction() {
      return typeof this.locationClass === "function";
    },
    isLocationTabindexFunction() {
      return typeof this.locationTabindex === "function";
    },
    ...mapGetters(["Status", "RegionsColors", "RegionsData", "Filter"])
  },
  methods: {
    /**
     * Get custom properties of a location to add custom attributes to <path>
     *
     * @param {Object} location - Location to parse
     * @returns {Object} Custom properties
     */
    getLocationCustomProperties(location) {
      // Filter default properties to avoid invalid/duplicated attributes
      return Object.fromEntries(
        Object.entries(location).filter(
          ([key]) => !LOCATION_DEFAULT_PROPERTIES.includes(key)
        )
      );
    },
    getLocationClass(location, index) {
        // Generate heat map
        return `svg-map__location svg-map__location--heat${index % 4}`
    },
    locationStyle(id) {
        let rColor = this.$store.state.RegionsColors.find(region => region.id == id).color
        return 'fill: rgb('+ rColor.red + ',' + rColor.green + ',' + rColor.blue + ');'
    },
    //tooltips
    pointLocation(event) {
        let regionData = this.$store.getters.RegionsData
            .filter(rd => rd.ID_Region == event.target.id)
            .filter(rd => rd.Year == this.$store.getters.Filter.Year)
            .filter(rd => rd.Settlement == this.$store.getters.Filter.Settlement)
            .filter(rd => rd.Sex == this.$store.getters.Filter.Sex)
            .filter(rd => rd.N_class == 0)

        this.pointedLocation.name = regionData[0].Name_Region //getLocationName(event.target)
        this.pointedLocation.Id = event.target.id

        let PGPJ = regionData[0].PGPJ
        if(PGPJ) {
            this.pointedLocation.PGPJ = PGPJ
        }else {this.pointedLocation.PGPJ = 'нет'}

        let population =  this.$store.getters.PopulationData
            .filter(pd => pd.ID_Region == event.target.id && pd.Settlement == 'T' && pd.Sex == 'B')
            [0].Population
        this.pointedLocation.Population  = population

        let OPJ= this.$store.getters.OpjData
            .filter(od => od.ID_Region == event.target.id && od.Settlement == 'T' && od.Sex == 'B')
            [0].OPJ
        this.pointedLocation.OPJ =  OPJ

        //console.log(this.pointedLocation)
    },
    unpointLocation(event) {
        this.pointedLocation = {Id: null, Name: null, PGPJ: null, Population: null, OPJ: null}
        this.tooltipStyle = { display: 'none' }
    },
    moveOnLocation(event) {
        const margin = 10
        const blockWidth = 200

        const screenWidth = document.documentElement.clientWidth
        const screenHeight = window.innerHeight

        let top = event.clientY + 30
        let left = event.clientX - blockWidth/2
        if (left < 0) { left = margin }
        if (left > (screenWidth - blockWidth - margin)) left = screenWidth - margin - blockWidth

        this.tooltipStyle = {
            display: 'block',
            top: `${top}px`,
            left: `${left}px`,
        }
    },
  },
};
</script>
