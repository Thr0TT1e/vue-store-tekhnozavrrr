<template>
  <BaseFormField :title="title" :error="error">
    <input
        class="form__input"
        :type="type"
        :placeholder="placeholder"
        :value="dataValue"
        @input="formUpdate"
    >
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin.js';

export default {
  name: 'BaseFormText',
  
  props: {
    type: {
      default: 'text'
    }
  },
  
  mixins: [formFieldMixin],
}
</script>

<style scoped>

</style>