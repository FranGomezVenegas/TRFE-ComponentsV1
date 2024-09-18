import { css } from 'lit';

export const styles = css`
          table.styled-table-for-rolesandactions th{
            color:gray !important;
          }

          .title {
            color: #2989d8;
            font-size: 18px;
            font-weight: bold;
          }

          table.styled-table-for-rolesandactions th, td{
            border: none !important;
          }

          table.styled-table-for-rolesandactions tr:nth-child(even) {
            background-color: white !important;
          }

          table.styled-table-for-rolesandactions tr {
            border: none;
            border-bottom: 1px solid #dddddd;
          }
          
          table.styled-table-for-rolesandactions tr:last-child {
            border: none;
          }

          * {
            box-sizing: border-box;
          }

        table.TRAZiT-DefinitionArea thead tr th {
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          font-family: Montserrat;
          padding: 8px; /* Ajusta el relleno según sea necesario */        
          background-color: #2989d8;
          color: white !important;
        }

        table.TRAZiT-UsersArea thead tr th {
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          font-family: Montserrat;
          padding: 8px; /* Ajusta el relleno según sea necesario */        
          background-color: white;
          color: gray;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          font-family: Montserrat;
          font-size: 16px;
        }

        table.TRAZiT-UsersArea-for-rolesandactions tr {
          border: none; 
          border-bottom: 1px solid #dddddd;
        }

        tr {
          border: 1px solid #dddddd;
          text-align: center;
          color: #808080;
        }

        table.TRAZiT-UsersArea-for-rolesandactions tr:nth-child(even) {
          background-color: white;
        }

        table.TRAZiT-UsersArea-for-rolesandactions tr:last-child {
          border: none;
        }
     
        table.TRAZiT-UsersArea-for-rolesandactions thead {
          border-bottom: 1px solid #dddddd;
        }

        table.TRAZiT-DefinitionArea-for-rolesandactions tr:nth-child(even) {
          background-color: rgba(214, 233, 248, 0.37) !important;
        }

        table.TRAZiT-DefinitionArea-for-rolesandactions th {
          padding: 5px 5px;
          border: 1px solid #dddddd !important;
        }

        td, th {
          padding: 5px 5px;
          border: 1px solid #dddddd !important;
        }

        table.TRAZiT-UsersArea-for-rolesandactions td, th {
          border: none !important;
        }

        tr {
          cursor: pointer;
        }

        mwc-icon-button {
        --mdc-icon-button-size: 35px;
        --mdc-icon-size: 25px;
        }
        
        td.absent {
          background-color: #e0121257;
        }
        
        td.present {
          background-color: #5e80003d;
        }

        table tr:hover td.title1 {
          background-color: #2989d830 !important;
        }
        table td {
          font-size: 16px !important;
          font-family: "Montserrat";
        }
`;
