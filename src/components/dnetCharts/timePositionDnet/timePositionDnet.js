import React from 'react'
import NodeItemContainer from '../../nodeItemContainer/nodeItemContainer.js'
import LinkContainer from '../../linkContainer/linkContainer.js'

export default function TimePositionDnet(props) {
    const { data, config, markLine } = props
    const { height, width, margin = 10 } = config.basic
    const len = data.length
    if (len === 0) return null
    return (
        <div
            style={{
                width: '100%',
                height: '730px',
                overflowX: 'auto'
            }}
            className="TimePositionDnet"
        >
            <svg
                className="nlg-container-svg"
                width={`${width * len + margin * (len - 1)}px`}
                height={`${height}px`}
                viewBox={`0 0 ${width * len + margin * (len - 1)} ${height}`}
                preserveAspectRatio="xMinYMin"
            >
                <g>
                    {markLine
                        ? markLine.map((links, index) => {
                              return (
                                  <g key={`curve-g-${index}`}>
                                      {links.data.map((v, index) => {
                                          return (
                                              <path
                                                  d={v}
                                                  stroke={props.config.time.markLine.strokeColor}
                                                  strokeWidth={`${props.config.time.markLine.strokeWidth}px`}
                                                  strokeDasharray={
                                                      props.config.time.markLine.strokeDasharray
                                                  }
                                                  key={`curve-link-${index}`}
                                              />
                                          )
                                      })}
                                  </g>
                              )
                          })
                        : null}
                </g>
                {data.map((dataItem, index) => {
                    return (
                        <g key={`subGraph-${index}`}>
                            <g>
                                {dataItem.links.map((v) => {
                                    return (
                                        <LinkContainer {...props} {...v} key={`link-${v.timeId}`} />
                                    )
                                })}
                            </g>
                            <g>
                                {dataItem.nodes.map((v) => {
                                    return (
                                        <NodeItemContainer
                                            {...props}
                                            {...v}
                                            key={`node-${v.timeId}`}
                                        />
                                    )
                                })}
                            </g>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
