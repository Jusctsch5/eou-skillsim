import React, {Component} from 'react';
import './header.css';

import skillData from '../data/skill_data';

// Helper Functions
import {firstDegSkills} from '../helpers'

function calculate_sp(level, retirementIdx) {
    // TODO: Account for Retirement
    return level + 2
  }

function getClasses() {
    const classes = [];
    skillData.forEach(function (datum) {
      classes.push(datum.class)
    })
  
    return(classes);
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.level = props.level;
        this.firstDegSkills = firstDegSkills();
    }

    _changeLevel() {
        const levelSpan = this.refs.level
        const newLevel = parseInt(levelSpan.textContent) + 1;
        console.log('-> _changeLevel', newLevel);
        this.props.updateMethod('level', newLevel)
    }

    render() {
        const class_opts = getClasses();
        const class_chosen = class_opts[this.props.activeClassIdx];

        const skillPointsTotal = calculate_sp(this.props.level, this.props.retirementIdx);
        const skillPointsRemaining = -1;

        return <div className="HeaderBar">Header Goes Here (doot)
            <ul>
                <li>activeClass: {class_chosen}:{this.activeClassIdx}</li>
                <li onClick={this._changeLevel.bind(this)}>Level: <span ref='level'>{this.props.level}</span></li>
                <li>RetirementIdx: {this.props.retirementIdx} </li>
                <li>skillPointsTotal: {skillPointsTotal}</li>
                <li>skillPointsRemaining: {skillPointsRemaining}</li>
            </ul>
        </div>
    }
}

export default Header;