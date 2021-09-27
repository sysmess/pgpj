<template>
  <div class="download">
    <h1>Скачать</h1>
    <a-row>
      <a-col :md="24" :lg="12">
        <div id="about-left" class="container left">
            <p>З-46 Навигатор общественного здоровья : Успешные практики некоммерческих организаций по мотивации граждан к здоровому образу жизни, включая здоровое питание и отказ от вредных привычек</p>
            <p>Сборник успешных практик предназначен для тех, кто собирается жить активно, долго и счастливо и желает того же окружающим. Свою приверженность здоровому образу жизни, свой потенциал общественники, как правило, реализуют через социальные проекты. В сборнике представлены успешные проекты некоммерческих организаций по популяризации здорового образа жизни, включая здоровое питание и отказ от вредных привычек из Вологодской области, Ульяновской области, Республики Башкортостан. Практически все проекты – победители конкурсов Фонда президентских грантов в различные годы.</p>

            <a-button href="/storage/download/booklet.pdf" target="_blank" type="primary"> <a-icon type="download" /> Скачать Pdf </a-button>
        </div>
      </a-col>

      <a-col :md="24" :lg="12">
        <div id="about-right" class="container left">
            <img class="booklet" alt="booklet" :src="require('../assets/booklet1.jpg').default" />
        </div>

      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.right {
  text-align: right;
  padding-right: 20px;
}
.left {
  text-align: left;
  padding-left: 20px;
}
.booklet {
  width: 388px;
}
.container {
  min-height: 320px;
}
</style>
