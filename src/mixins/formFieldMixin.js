import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'dataValue'],

  emits: ['update:dataValue'],

  components: {
    BaseFormField
  },

  methods: {
    formUpdate(event) {
      this.$emit('update:dataValue', event.target.value)
    },
  },
}