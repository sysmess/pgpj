<template xmlns="http://www.w3.org/1999/html">
  <div id="footer">
    <a-divider />
    <a-row>
      <a-col :span="12" id="footer-left" class="left">
          <a-row>
            <a-col :span="6">
              <img id="pglogo" alt="Pg logo" :src="require('../assets/pgrants_logo.svg').default" />
            </a-col>
            <a-col :xs="0" :sm="0" :xl="18" class="pgrant">
              Проект реализован с использованием средств гранта Президента Российской Федерации на развитие гражданского общества
            </a-col>
          </a-row>
      </a-col>

      <a-col :span="12">
          <div id="footer-right" class="left">
            <div id="copyright" class="left">
                <span>Copyright @ 2021</span>
                 <a-divider type="vertical"  />
                 <router-link to="/agreement" class="left">Пользовательское соглашение</router-link>
            </div>
            <div id="social" class="left">
                    Поделиться:
                    <span  class="footer-social-icon"><a-icon type="facebook" theme="filled"/></span>
                    <span  class="footer-social-icon"><a-icon type="instagram" theme="filled" class="footer-social-icon" /></span>
                    <span  class="footer-social-icon"><a-icon type="twitter-square" theme="filled" class="footer-social-icon" /></span>
                </div>
          </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import numeral from 'numeral';

export default {
  name: "Footer",
  data() {
    return {
        numStr: numeral(0.97487).format('0.00%')
    }
  }
};
</script>

<style scoped>
.right {
  text-align: right;
}
.left{
  text-align: left;
}
.icons-list >>> .anticon {
  margin-right: 6px;
  font-size: 24px;
}

#footer-left {
  display: flex;
}
#footer-right {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
}
#pglogo {
  display: flex;
  margin-right: 20px;
}
.pgrant {
  padding-top: 8px;
}
#social {
  display: flex;
}
.footer-social-icon {
  display: inline-flex;
  align-self: center;
  padding-left: 4px;
}
#copyright {
  display: flex;
}

.ant-col {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
