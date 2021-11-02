import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import {Answer} from '../models/answer'
import React from "react";
import {BarChartClass, DataBarChart} from "../models/databarchart";

import { Bar } from "react-chartjs-2";
export default class BarChart extends React.Component<Answer[],boolean> {
    DataBarChart: DataBarChart
    constructor(props:Answer[]){
        super(props);
        const barchartClass = new BarChartClass(props)
        this.DataBarChart = barchartClass.DataBarChart
    }
  render() {
    return(
        <Bar
            data={this.DataBarChart}
        />
    )

  }
}
