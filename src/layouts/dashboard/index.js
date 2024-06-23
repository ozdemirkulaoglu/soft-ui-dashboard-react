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
import CodeBlockDemo from "layouts/dashboard/components/CodeBlock/codeBlockDemo";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

import projectsTableData from "layouts/tables/data/projectsTableData";
import scenariosTableData from "layouts/tables/data/scenariosTableData";
import scenarioStepsTableData from "layouts/tables/data/scenarioStepsTableData";
import anomalyTableData from "layouts/tables/data/anomalyTableData";

import axios from 'axios';

import Action from "../tables/data/action";
import ScenarioStepsAction from "../tables/data/scenarioStepsAction";
import Record from "../tables/data/record";
import Completion from "../tables/data/completion";
import AnomalyAction from "../tables/data/anomalyAction";

import logoSpotify from "assets/images/illustrations/rocket-white.png";

import SoftButton from "components/SoftButton";

const getAllProjectsURL = "https://neotest-701e1c076af2.herokuapp.com/api/count/get";
const getProjectURL = "https://neotest-701e1c076af2.herokuapp.com/api/count/get/localhost:5173";
const getScenarioURL = "https://neotest-701e1c076af2.herokuapp.com/api/test/get-projectId";
const getScenarioStepURL = "https://neotest-701e1c076af2.herokuapp.com/api/test/get-scenarioId";
const suggestionProjectsURL = "https://neotest-701e1c076af2.herokuapp.com/api/suggestion/get-projectId";

function Dashboard() {

  const scenarioColumns = [
    { name: "project", align: "left" },
    { name: "id", align: "left" },
    { name: "name", align: "left"},
    { name: "action", align: "center" },
  ];

  const scenarioStepColumns = [
    { name: "project", align: "left" },
    { name: "scenario", align: "left" },
    { name: "steps", align: "left" },
  ];

  const anomaliesColumns = [
    { name: "anomaly", align: "left" },
    { name: "project", align: "left" },
    { name: "scenario", align: "left" },
    { name: "id", align: "left" },
    { name: "action", align: "center" }
  ];

  const [tableVisibility, setTableVisibility] = useState("P");
  const [newScenarioVisibility, setNewScenarioVisibility] = useState("S");
  const [projects, setProjects] = useState([]);
  const [scenarioDataList, setScenarioDataList] = useState([]);
  const [scStDataList, setScStDataList] = useState([]);
  const [anomalyDataList, setAnomalyDataList] = useState([]);

  const [projectsData, setProjectsData] = useState([]);
  const [scenarioData, setScenarioData] = useState([]);
  const [scenarioStepData, setScenarioStepData] = useState([]);
  const [anomalyData, setAnomalyDAta] = useState([]);

  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const { scenarioColumns: scCols, rows: scRows } = {...scenariosTableData, ...{scenarioColumns}};
  const { scenarioStepColumns: scStCols, rows: scStRows } = {...scenarioStepsTableData, ...{scenarioStepColumns}};
  const { anomaliesColumns: anomalyCols, rows: anomalyRows } = {...anomalyTableData, ...{anomaliesColumns}};

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    
    axios
      .post(suggestionProjectsURL,{
        "projectId": 'KLH'
      },)
      .then((response) => {
        console.log("response.data: ", response.data);
        setAnomalyDataList(response.data);
      });
  }, []);

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    
    axios
      .get(getAllProjectsURL)
      .then((response) => {
        console.log("response.data: ", response.data);
        var result = response.data.filter(x => x.env === 'test');
        setProjects(result);
      });
  }, []);

  useEffect(() => {
    const tmpProjects = projects.map((i) => ({
      project: [logoSpotify, i.projectId],
      scenario: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {i.count}
        </SoftTypography>
      ),
      environment: i.env,
      record: <Record started={i.isOpen} />,
      url: i.url,
      completion: <Completion value={90} color="success" />,
      action: <Action projectId={i.projectId} showTestScenarios={setTableVisibility} showScenarioList={setScenarioDataList}/>,
    }));
    console.log("tmpProjects:", tmpProjects);
    setProjectsData(tmpProjects);
  }, [projects]);

  useEffect(() => {
    const tmpProjects = scenarioDataList.map((i) => ({
      project: [logoSpotify, i.projectId],
      id: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {i.scenarioId}
        </SoftTypography>
      ),
      name: i.scenarioName,
      action: <ScenarioStepsAction projectId={i.projectId} scenarioId={i.scenarioId} showTestScenarios={setTableVisibility} showScenarioStepList={setScStDataList}/>,
    }));
    console.log("tmpProjects:", tmpProjects);
    setScenarioData(tmpProjects);
  }, [scenarioDataList]);

  useEffect(() => {
    const tmpProjects = scStDataList.map((i) => ({
      project: [logoSpotify, i.projectId],
      scenario: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {i.scenarioId}
        </SoftTypography>
      ),
      steps: i.scenarioText
    }));
    console.log("tmpProjects:", tmpProjects);
    setScenarioStepData(tmpProjects);
  }, [scStDataList]);

  useEffect(() => {
    const tmpProjects = anomalyDataList.map((i) => ({
      project: i.projectId,
      scenario: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {/* {i.scenarioText} */}
          {'Scenario ' + i.scenarioId}
        </SoftTypography>
      ),
      anomaly: [logoSpotify, i.anomaly !== null && i.anomaly.toLowerCase() === "yes" ? "Yes" : "Yes"],
      id: i.scenarioId,
      action: <AnomalyAction projectId={i.projectId} scenarioId={i.scenarioId} showTestScenarios={setNewScenarioVisibility} showScenarioStepList={setScStDataList}/>,
    }));
    console.log("tmpProjects:", tmpProjects);
    setAnomalyDAta(tmpProjects);
  }, [anomalyDataList]);

  const handleGoBackToProject = () => {
    setTableVisibility("P");
  }

  const handleGoBackToTestScenarios = () => {
    setTableVisibility("S");
  }

  const handleGoBackToNewScenarios = () => {
    setNewScenarioVisibility("S")
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total number of test scenarios" }}
                count="12"
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "test environment scenarios" }}
                count="10"
                percentage={{ color: "success", text: "+83.33%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new test scenarios generated" }}
                count="5"
                percentage={{ color: "success", text: "+41.66%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new scenarios found" }}
                count="2"
                percentage={{ color: "success", text: "+16.66%" }}
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
        { 
          newScenarioVisibility === 'S' ?
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">New Scenarios</SoftTypography>
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
                <Table columns={anomalyCols} rows={anomalyData} />
              </SoftBox>
            </Card>
          </SoftBox>
        : null
        }
        {
          newScenarioVisibility === "G" ? 
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">Test Scenario Code in Gherkin</SoftTypography>
                <SoftButton
                  size="small"
                  color="light"
                  onClick={handleGoBackToNewScenarios}
                  fullWidth={false}
                  sx={{
                    mr: 1,
                  }}
                >
                  {"<-- Geri"}
                </SoftButton>
              </SoftBox>
              <SoftBox display="flex" p={3}>
                <CodeBlockDemo></CodeBlockDemo>
              </SoftBox>
            </Card>
          </SoftBox>
          : null 
        }
        {
          tableVisibility === "P" ? 
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
          : null
        }
        {
          tableVisibility === "S" ? 
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="left" p={3}>
              <SoftTypography variant="h6">Test Scenarios</SoftTypography>
              <SoftButton
                size="small"
                color="light"
                onClick={handleGoBackToProject}
                fullWidth={false}
                sx={{
                  mr: 1,
                }}
              >
                {"<-- Geri"}
              </SoftButton>
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
        : null
      }
      {
          tableVisibility === "ST" ? 
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Test Scenario Steps</SoftTypography>
              <SoftButton
                size="small"
                color="light"
                onClick={handleGoBackToTestScenarios}
                fullWidth={false}
                sx={{
                  mr: 1,
                }}
              >
                {"<-- Geri"}
              </SoftButton>
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
        : null
      }
      {
        tableVisibility === "TSG" ? 
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Test Scenario Code in Gherkin</SoftTypography>
              <SoftButton
                size="small"
                color="light"
                onClick={handleGoBackToTestScenarios}
                fullWidth={false}
                sx={{
                  mr: 1,
                }}
              >
                {"<-- Geri"}
              </SoftButton>
            </SoftBox>
            <SoftBox display="flex" p={3}>
              <CodeBlockDemo></CodeBlockDemo>
            </SoftBox>
          </Card>
        </SoftBox>
        : null 
      }
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
