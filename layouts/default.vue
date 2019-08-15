<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">

$primary: #5EA6E0;
$primary-100: #F0F7FC;

html {
  font-family: 'Inter', -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  font-size: 12px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body{
  display: flex;
  justify-content: center;
}

summary::-webkit-details-marker { display: none; }

a{
  text-decoration: none;
  color: inherit;
}

button, summary{
  list-style: none;
  padding: 10px 15px;
  border-radius: 3px;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  &.primary{
    color: white;
    background: $primary;
  }

  &.secondary{
    color: $primary;
    background: $primary-100;
  }

  &.small{
    padding: 5px 10px;
    border-radius: 20px;
    color: $primary;
    background: $primary-100;
    font-size: 1rem;
    font-weight: 500;
  }
}

input{
  padding: 15px;
  background: $primary-100;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 3px;
  outline: none;

  &::placeholder{
    color: $primary;
  }
}

h4{
    font-size: 1.3rem;
    line-height: 1.6rem;
    font-weight: 400;
}

small{
    color: $primary;
    font-size: .8rem;
    line-height: 1rem;
    font-weight: 600;
    display: block;
}

p{
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #BDBDBD;
}
</style>
