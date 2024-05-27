import { useState } from "react";

import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SoftTypography from "components/SoftTypography";

// @mui material components
import Switch from "@mui/material/Switch";

function Record({ started }) {

    const [recordStarted, setRecordStarted] = useState(started);

    return (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          <Switch checked={recordStarted} onChange={() => setRecordStarted(!recordStarted)} />
        </SoftTypography>
    );
}

Record.propTypes = {
    started: PropTypes.oneOfType([PropTypes.bool]).isRequired,
}

export default Record;