<script lang="tsx">
import { ref, watch, defineComponent, h, computed } from 'vue'

interface InputProps {
  value: string,
  onChange?: (value: string) => void,
}

const Input =  defineComponent({
  setup(props: InputProps, { emit }) {
    const handleChange = (e: KeyboardEvent) => {
      emit('update:value', (e.target as any)!.value)
    }

    const id = computed(() => props.value + 1)

    return () => h('input', {
      class: ['test'],
      style: { 
        display: 'block',
      },
      id: id.value,
      onInput: handleChange,
      value: props.value,
    })
  },
})

export default Input
</script>
