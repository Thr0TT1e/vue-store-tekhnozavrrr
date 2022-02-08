<template>
  <BaseFormField :title="title" :error="error">
    <textarea
        class="form__input form__input--area"
        :placeholder="placeholder"
        :value="dataValue"
        @input="formUpdate"
    />
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin.js';

export default {
  name: 'BaseFormTextarea',
  
  mixins: [formFieldMixin]
}
</script>

<style scoped>

</style>