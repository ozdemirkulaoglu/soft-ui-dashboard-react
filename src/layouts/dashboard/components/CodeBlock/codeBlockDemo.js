import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import PropTypes from "prop-types";

function CodeBlockDemo({ codeContentStr }) {

  const codeContent = `
  Feature: KlhScreenTest

  Scenario:
    Given open KLH web page
    Then wait for web page to be loaded

    Given find input with id 'first-name' on the page
    When enter value of 'john' for input with id 'first-name'
    Then check that if value equals to 'john'

    Given find input with id 'last-name' on the page
    When enter value of 'snow' for input with id 'last-name'
    Then check that if value equals to 'snow'

    Given find input with id 'address1' on the page
    When enter value of 'snow' for input with id 'address1'
    Then check that if value equals to 'ankara'
  `;

  return (
    <CodeBlock code={codeContentStr} language="js" theme={themes.github}>
      <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        <div className="text-sm text-gray-400 px-6 py-4" style={{fontSize:"16px", fontWeight:"bold"}}>İhtiyaçKredisiScenario.feature</div>
        <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <div className="table-row">
            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" style={{display:"inline", fontSize:"16px"}} />
            <CodeBlock.LineContent className="table-cell" style={{display:"inline", fontSize:"16px", paddingLeft:"5px"}}>
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>
      </div>
    </CodeBlock>
  );
}

CodeBlockDemo.propTypes = {
  codeContentStr: PropTypes.oneOfType([PropTypes.string, PropTypes.string]).isRequired
}

export default CodeBlockDemo;