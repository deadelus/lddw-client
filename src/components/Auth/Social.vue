<template>
    <!-- OpenID -->
    <div id="social">
        <facebook></facebook>
        <!--
          <twitter></twitter>
        -->
    </div>
</template>
<script>
  import Facebook from '@/components/Auth/Btn/Facebook'
  export default {
    name: 'social',
    components: {Facebook}
  }
</script>