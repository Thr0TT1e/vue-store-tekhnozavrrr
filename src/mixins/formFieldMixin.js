import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'dataValue'],

  emits: ['update:dataValue'],

  components: {
    BaseFormField
  },

  methods: {
    formUpdate(value) {
      this.$emit('update:dataValue', value)
    },
  },
}