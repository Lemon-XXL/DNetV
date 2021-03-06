import React from 'react'
import NodeItemContainer from '../nodeItemContainer/nodeItemContainer.js'
import LinkContainer from '../linkContainer/linkContainer.js'
import Motion from '../motion/Motion'

// import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'

export default function NodeLinkGraph(props) {
    const { data, width, height, margin } = props
    // console.log("NodeLinkGraph---data", data)
    return (
        <div
            className="nlg-container"
            style={{
                width: width,
                height: height,
                margin: margin
            }}
        >
            <svg
                className="nlg-container-svg"
                width={`${width}px`}
                height={`${height}px`}
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMinYMin"
            >
                <g>
                    {data.links.map((v, i) => {
                        return (
                            <Motion
                                duration={1500}
                                key={`${v.id}_motion`}
                                style={{
                                    opacity: 1,
                                    sourceX: v.source.x,
                                    sourceY: v.source.y,
                                    targetX: v.target.x,
                                    targetY: v.target.y
                                }}
                            >
                                {({ opacity,sourceX, sourceY,targetX,targetY }) => (
                                    <LinkContainer
                                        {...props}
                                        {...v}
                                        source={{
                                            ...v.source,
                                            x: sourceX,
                                            y: sourceY
                                        }}
                                        target={{
                                            ...v.target,
                                            x: targetX,
                                            y: targetY
                                        }}
                                        opacity={opacity}
                                        key={`link-${v.id}`}
                                    />
                                )}
                            </Motion>
                        )
                    })}
                </g>
                <g>
                    {data.nodes.map((v,i) => {
                        return (
                            <Motion
                                duration={1500}
                                key={`${v.id}_motion`}
                                style={{
                                    opacity: 1,
                                    x: v.x,
                                    y: v.y
                                }}
                            >
                                {({ opacity,x ,y }) => (
                                    <NodeItemContainer 
                                        {...props} 
                                        {...v} 
                                        x = {x}
                                        y = {y}
                                        opacity={opacity}
                                        key={`node-${v.id}`} />
                                )}
                            </Motion>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}
