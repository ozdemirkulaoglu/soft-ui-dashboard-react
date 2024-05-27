/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Table from "examples/Tables/Table";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

import projectsTableData from "layouts/tables/data/projectsTableData";
import scenariosTableData from "layouts/tables/data/scenariosTableData";
import scenarioStepsTableData from "layouts/tables/data/scenarioStepsTableData";

import axios from 'axios';

import Action from "../tables/data/action";
import ScenarioStepsAction from "../tables/data/scenarioStepsAction";
import Record from "../tables/data/record";
import Completion from "../tables/data/completion";

import logoSpotify from "assets/images/small-logos/logo-spotify.svg";

const getProjectURL = "https://neotest-701e1c076af2.herokuapp.com/api/count/get/localhost:5173";
const getScenarioURL = "https://neotest-701e1c076af2.herokuapp.com/api/test/get-projectId";
const getScenarioStepURL = "https://neotest-701e1c076af2.herokuapp.com/api/test/get-scenarioId";

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [scenarioDataList, setScenarioDataList] = useState([]);
  const [scStDataList, setScStDataList] = useState([]);

  const [projectsData, setProjectsData] = useState([]);
  const [scenarioData, setScenarioData] = useState([]);
  const [scenarioStepData, setScenarioStepData] = useState([]);
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const { columns: scCols, rows: scRows } = {...projectsTableData};
  const { columns: scStCols, rows: scStRows } = {...projectsTableData};

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    
    axios
      .get(getProjectURL)
      .then((response) => {
        console.log("response.data: ", response.data);
        setProjects([].concat(response.data));
      });
  }, []);

  useEffect(() => {
    const tmpProjects = projects.map((i) => ({
      project: [logoSpotify, i.projectId],
      scenario: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          2,500
        </SoftTypography>
      ),
      record: <Record started={false} />,
      completion: <Completion value={60} color="info" />,
      action: <Action projectId={i.projectId}/>,
    }));
    console.log("tmpProjects:", tmpProjects);
    setProjectsData(tmpProjects);
  }, [projects]);

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    
    axios
      .post(getScenarioURL, {
        "projectId":"KLH"
      },
    )
      .then((response) => {
        console.log("response.data: ", response.data);
        setScenarioDataList(response.data);
      });
  }, []);

  useEffect(() => {
    const tmpProjects = scenarioDataList.map((i) => ({
      project: [logoSpotify, i.projectId],
      scenario: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          2,500
        </SoftTypography>
      ),
      record: "",
      completion: "",
      action: <ScenarioStepsAction projectId={i.projectId}/>,
    }));
    console.log("tmpProjects:", tmpProjects);
    setScenarioData(tmpProjects);
  }, [scenarioDataList]);

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    
    axios
      .post(getScenarioStepURL, {
        "projectId":"KLH",
        "scenarioId": 1
      },
    )
      .then((response) => {
        console.log("response.data: ", response.data);
        setScStDataList(response.data);
      });
  },[]);

  useEffect(() => {
    const tmpProjects = scStDataList.map((i) => ({
      project: [logoSpotify, i.scenarioText],
      scenario: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          2,500
        </SoftTypography>
      ),
      record: "",
      completion: "",
      action: ""
    }));
    console.log("tmpProjects:", tmpProjects);
    setScenarioStepData(tmpProjects);
  }, [scStDataList]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total number of test scenarios" }}
                count="5762"
                percentage={{ color: "success", text: "+35%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "test environment scenarios" }}
                count="2,300"
                percentage={{ color: "success", text: "+30%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "test scnearios generated" }}
                count="103"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new scenarios found" }}
                count="5"
                percentage={{ color: "success", text: "+25%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox> */}
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Projects</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={prCols} rows={projectsData} />
            </SoftBox>
          </Card>
        </SoftBox>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Test Scenarios</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={scCols} rows={scenarioData} />
            </SoftBox>
          </Card>
        </SoftBox>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Test Scenario Steps</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={scStCols} rows={scenarioStepData} />
            </SoftBox>
          </Card>
        </SoftBox>
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrderOverview />
            </Grid>
          </Grid>
        </SoftBox> */}
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox> */}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
