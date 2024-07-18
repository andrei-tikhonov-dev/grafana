import * as d3 from 'd3';
import React, { useEffect } from 'react';

interface HeaderProps {
  headerData: any;
  width: any;
  id: any;
  topMargin: number;
  textColor: string;
}

export const Headers: React.FC<HeaderProps> = ({ headerData, width, id, topMargin, textColor }) => {
  useEffect(() => {
    //clear old headers
    d3.select('#' + id)
      .selectAll('.header-text')
      .remove();

    const head = d3
      .select('#' + id)
      .append('g')
      .attr('id', `${id} header`);
    const MARGIN = { top: topMargin, right: 20, bottom: 50, left: 20 };

    const translateY = MARGIN.top / 2;

    // Add left and right axis labels
    head
      .append('text')
      .attr('class', 'header-text')
      .attr('transform', 'translate(' + MARGIN.left + ',' + translateY + ')') // above left axis
      .attr('font-size', '14pt')
      .attr('font-weight', '500')
      .attr('text-anchor', 'start')
      .text(headerData[0])
      .attr('fill', textColor);

    head
      .append('text')
      .attr('class', 'header-text')
      .attr('transform', 'translate(' + (width + MARGIN.left) + ',' + translateY + ')') // above right axis
      .attr('font-size', '14pt')
      .attr('font-weight', '500')
      .attr('text-anchor', 'end')
      .text(headerData[headerData.length - 2]) // last one is value label
      .attr('fill', textColor);

    if (headerData.length > 3) {
      const colWidth = width / (headerData.length - 2);
      for (let i = 1; i < headerData.length - 2; i++) {
        let translateX = colWidth * i + MARGIN.left;
        head
          .append('text')
          .attr('class', 'header-text')
          .attr('transform', `translate(${translateX},${translateY})`)
          .attr('font-size', '14pt')
          .attr('font-weight', '500')
          .attr('text-anchor', 'middle')
          .text(headerData[i])
          .attr('fill', textColor);
      }
    }
  });

  return null;
};
