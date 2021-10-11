import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        --text-body: #969cb3;
        
        --background: #282c34;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%; // 15px
        }

        @media (max-width: 720px) {
            font-size: 87.5%; // 14px  
        }
    }


    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;

        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
        'Helvetica Neue', sans-serif;
        height: 100vh;
        place-items: center;
        display: grid;
    }

    button { 
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
    }
`
