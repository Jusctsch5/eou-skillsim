
import React, {Component} from 'react';
import SkillTreeNode from './skillTreeNode'
import './skillTree.css';

// Data Import
import skillData from '../data/skill_data';
import treeData from '../data/tree_data'

// Helper Functions
import {firstDegSkills} from '../helpers';


class SkillTree extends Component {
    constructor(props) {
        super(props);
        this.firstSkills = firstDegSkills()
        this.buildSkillTreeNodes = this.buildSkillTreeNodes.bind(this);
        this._addSkill = this._addSkill.bind(this)
    }

    _addSkill(skillId) {
        console.log('-> _addSkill', skillId, 'clicked on');
        this.props.updateMethod('skillsChosen', skillId)
    }

    buildSkillTreeNodes() {
        const objProps = this.props;
        const skillTreeData = skillData[objProps.activeClassIdx];
        const addSkillFunc = this._addSkill;
        const updateMethod = this.props.updateMethod;

        const branches = skillTreeData.branches;
        const output = {};
        branches.forEach(function (skillBranch) {
            // if (skillBranch.skill_data.length !== 0) {
            //     output.push(<h2 key={skillBranch.name + 'branch'}>
            //         {skillBranch.name} Branch</h2>)
            // }

            skillBranch.skill_data.forEach(function (skillDatum) {
                output[skillDatum._id] = <SkillTreeNode
                    key={skillDatum._id}
                    skillData={skillDatum}
                    activeFlag={Object.keys(objProps.skillsChosen).includes(skillDatum._id)}
                    onClickFunc={() => addSkillFunc(skillDatum._id)}
                    skillLevel={objProps.skillsChosen[skillDatum._id] || 0}
                    updateMethod={updateMethod}
                ></SkillTreeNode>
            });
        })
        return output
    }

    drawSkillTree(skillTreeNodes) {
        const BOX_WIDTH = 170;
        const BOX_PADDING = 40;
        const BOX_BORDER_WIDTH = 4;
        const BOX_HEIGHT = 60;
        const LINE_LENGTH = 40;
        const LINE_THICKNESS = 5;
        const output = [];

        const skillTreeStructure = treeData[this.props.activeClassIdx]

        skillTreeStructure.forEach(function (datum) {
            console.log(datum)
            var className = 'baseSkill';
            var xOffset = 0;
            var xCoord = null;
            var yCoord = null;

            if (!datum.baseSkill) {
                className = 'regularSkill';
                xOffset = BOX_WIDTH / 2;
            }
            xCoord = (BOX_WIDTH + BOX_PADDING) * datum.coords.x +
                (datum.coords.x > 0 ? datum.coords.x : 0) * LINE_LENGTH + xOffset;
            yCoord = (BOX_HEIGHT + BOX_PADDING) * datum.coords.y

            // Add the element
            const boxStyle = {top: yCoord + 'px',
                              left: xCoord + 'px',
                              'border-color': '#000000',
                              'border-width': BOX_BORDER_WIDTH + 'px',
                              'border-style': 'solid',
                              width: BOX_WIDTH + 'px',
                              height: BOX_HEIGHT + 'px'
                            }
            output.push(<div key={datum.skillID}
                        className={className + ' skillNode'}
                        style={boxStyle}>{skillTreeNodes[datum.skillID]}</div>)


            // Add Vertical and Horizontal bars as necessary
            if (datum.baseSkill) {
                var barXCoord = xCoord + BOX_WIDTH / 4;
                var barYCoord = yCoord + BOX_HEIGHT + 2 * BOX_BORDER_WIDTH;
                var barLength = datum.barSize * (BOX_HEIGHT + BOX_PADDING) - BOX_HEIGHT / 2;
                const barStyle = {top: barYCoord + 'px',
                                  left: barXCoord + 'px',
                                  height: barLength + 'px'}
                output.push(<div className='verticalBar' key='doot'
                            style={barStyle}></div>)
            } else {
                // draw lines before
                if (datum.coords.x == 0) {
                    // this line is a bit shorter
                }

                // draw lines after

            }
        });

        return <div>{output}</div>
    }

    render() {
        const skillTreeNodes = this.buildSkillTreeNodes()
        const doot = this.drawSkillTree(skillTreeNodes);

        return <div className="SkillTree">
            Skill Data Goes Here (pew)
            {doot}
            </div>
    }
}

export default SkillTree;
