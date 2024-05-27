/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

import Action from "./action";
import Record from "./record";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

// function Action() {
//   return (
//     <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
//       more_vert
//     </Icon>
//   );
// }

const scenariosTableData = {
  columns: [
    { name: "project", align: "left" },
    { name: "scenario", align: "left" },
    { name: "record", align: "left" },
    { name: "completion", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      project: [logoSpotify, "Spotift"],
      scenario: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          2,500
        </SoftTypography>
      ),
      record: <Record started={false} />,
      completion: <Completion value={60} color="info" />,
      action: <Action projectId={1}/>,
    }
  ],
};

export default scenariosTableData;
