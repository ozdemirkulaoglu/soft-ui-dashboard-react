import { useState } from "react";

// @mui material components
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

import PropTypes from "prop-types";

import axios from 'axios';

const getScenarioURL = "https://neotest-701e1c076af2.herokuapp.com/api/test/get-projectId";

function Action({ showTestScenarios, projectId, showScenarioList }) {
  
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const openTestScenarios = () => {
      showTestScenarios("S");
      getProjectTestScenarios();
  }

  const getProjectTestScenarios = () => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    
    axios
      .post(getScenarioURL, {
        "projectId": projectId
      },
    )
      .then((response) => {
        console.log("response.data: ", response.data);

        var result = [];
        var index = 0;
        response.data.forEach(function (a) {
          if ( !this[a.sessionId] && !this[a.scenarioId] ) {
              this[a.sessionId] = { projectId: a.projectId, sessionId: a.sessionId, scenarioId: a.scenarioId, scenarioName: "" };
              result.push(this[a.sessionId]);
              this[a.sessionId].scenarioName = "Scenario " + ++index;
          }          
      }, Object.create(null));
      console.log("Result: ", result);
        showScenarioList([].concat(result[0]));
      });
  }

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
      onClose={openTestScenarios}
    >
      <MenuItem onClick={openTestScenarios}>Show Test Scenario</MenuItem>
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

Action.propTypes = {
    projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    showTestScenarios: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    showScenarioList: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Action;