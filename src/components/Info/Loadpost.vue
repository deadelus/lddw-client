<template>
  <article class="post post--is-loading">
    <div class="post__loader">
      <div class="loader__bar--1"></div>
      <div class="loader__bar--2"></div>
      <div class="loader__bar--3"></div>
      <div class="loader__bar--4"></div>
      <div class="loader__bar--5"></div>
      <div class="loader__bar--6"></div>
      <div class="loader__bar--7"></div>
      <div class="loader__bar--8"></div>
      <div class="loader__bar--9"></div>
      <div class="loader__bar--10"></div>
      <div class="loader__bar--11"></div>
      <div class="loader__bar--12"></div>
      <div class="loader__bar--13"></div>
    </div>
  </article>
</template>
<script>
export default {
  name: 'loadpost'
}
</script>
<style>
.post--is-loading .post__loader {
  display: block;
  max-width: 750px;
  margin: auto;
}

.post__loader {
  display: none;
  position: relative;
  height: 60vh;
  background: #f6f7f8;
  background-image: -webkit-gradient(linear, left center, right center, from(#f6f7f8), color-stop(0.2, #edeef1), color-stop(0.4, #f6f7f8), to(#f6f7f8));
  background-image: -webkit-linear-gradient(left, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 100%;
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeHolderShimmer;
  -webkit-animation-timing-function: linear;
}
.post__loader > * {
  position: absolute;
  background: #fff;
  height: 6px;
  left: 0;
  right: 0;
}

.loader__bar--1 {
  height: 40px;
  left: 40px;
  right: auto;
  top: 0;
  width: 8px;
}

.loader__bar--2 {
  height: 8px;
  left: 48px;
  top: 0;
}

.loader__bar--3 {
  left: 136px;
  top: 8px;
}

.loader__bar--4 {
  height: 12px;
  left: 48px;
  top: 14px;
}

.loader__bar--5 {
  left: 100px;
  top: 26px;
}

.loader__bar--6 {
  height: 10px;
  left: 48px;
  top: 32px;
}

.loader__bar--7 {
  height: 20px;
  top: 40px;
}

.loader__bar--8 {
  left: 410px;
  top: 60px;
}

.loader__bar--9 {
  height: 13px;
  top: 66px;
}

.loader__bar-10 {
  left: 440px;
  top: 79px;
}

.loader__bar--11 {
  height: 13px;
  top: 85px;
}

.loader__bar--12 {
  left: 178px;
  top: 98px;
}

.loader__bar--13 {
  height: 13px;
  top: 104px;
}

@-webkit-keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

</style>