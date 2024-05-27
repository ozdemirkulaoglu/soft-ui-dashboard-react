import { useState } from "react";

import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

function Completion({ value, color }) {

    const [completionVal, setCompletionVal] = useState(value);
    const [completionColor, setCompletionColor] = useState(color);

    return (
        <SoftBox display="flex" alignItems="center">
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            {value}%&nbsp;
          </SoftTypography>
          <SoftBox width="8rem">
            <SoftProgress value={completionVal} color={completionColor} variant="gradient" label={false} />
          </SoftBox>
        </SoftBox>
      );
}

Completion.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string]).isRequired,
    color: PropTypes.oneOfType([PropTypes.string]).isRequired,
}

export default Completion;