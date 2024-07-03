import { css } from 'lit';

export const styles = css`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .file-preview {
    width: 100%;
    text-align: center;
  }

  .file-preview figcaption {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
`;
