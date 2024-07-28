import { defineComponent, ref } from '@vue-mini/core';

defineComponent(() => {
  const greeting = ref('希望你会喜欢');

  const handleClick = () => {
    greeting.value = '你好，欢迎来到我的博客';
  };

  return {
    greeting,
    handleClick
  };
});
