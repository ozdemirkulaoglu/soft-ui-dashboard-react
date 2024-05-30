import { useState } from "react";

// @mui material components
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

import PropTypes from "prop-types";

import axios from 'axios';

// const getScenarioStepURL = "https://neotest-701e1c076af2.herokuapp.com/api/test/get-scenarioId";

function AnomalyAction({ projectId, scenarioId, showTestScenarios, showScenarioStepList }) {

  const [projectActId, setProjectActId] = useState(projectId);
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const acceptProdScenario = () => {
    // showTestScenarios("ST");
    // getScenarioStepsList();
  }

  // const getScenarioStepsList= () => {
  //   axios.defaults.headers = {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //   }
    
  //   axios
  //     .post(getScenarioStepURL, {
  //       "projectId": projectId,
  //       "scenarioId": scenarioId
  //     },
  //   )
  //     .then((response) => {
  //       console.log("response.data: ", response.data);
  //       showScenarioStepList(response.data);
  //     });
  // }

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={acceptProdScenario}
    >
      <MenuItem onClick={acceptProdScenario}>Show Test Scenario Steps</MenuItem>
    </Menu>
  );

    return(
        <SoftBox color="text" px={2}>
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                more_vert
            </Icon>
            {renderMenu}
        </SoftBox>
    );
}

AnomalyAction.propTypes = {
    projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    scenarioId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    showTestScenarios: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    showScenarioStepList: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default AnomalyAction;