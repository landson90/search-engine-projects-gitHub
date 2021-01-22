import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
 
 * {
     margin: 0;
     padding: 0;
     outline: 0;
     box-sizing: border-box
 }

 html, body, #app {
     max-height: 100%;
 }

 body {
     background: #7159c1;
 }
`