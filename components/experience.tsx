"use client";

import React from "react";
import Image from "next/image";
import SectionHeading from "./section-heading";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/data/data";
import { useSectionInView } from "@/hooks/hooks";
import { useTheme } from "@/context/theme-context";

// Workaround: react-vertical-timeline-component's types are incompatible with current React typings in JSX.
// Cast to React.ComponentType<any> to allow usage as JSX elements without changing library types.
const VerticalTimelineComponent = VerticalTimeline as unknown as React.ComponentType<any>;
const VerticalTimelineElementComponent = VerticalTimelineElement as unknown as React.ComponentType<any>;

const Experience = () => {
    const { ref } = useSectionInView("Experience");
    const { theme } = useTheme();

    return (
        <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
            <SectionHeading>My experience</SectionHeading>
            <VerticalTimelineComponent lineColor="">
                {experiencesData.map((item, index) => (
                    <React.Fragment key={index}>
                        <VerticalTimelineElementComponent
                            contentStyle={{
                                background:
                                    theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                                boxShadow: "none",
                                border: "1px solid rgba(0, 0, 0, 0.05)",
                                textAlign: "left",
                                padding: "1.3rem 2rem",
                            }}
                            contentArrowStyle={{
                                borderRight:
                                    theme === "light"
                                        ? "0.4rem solid #9ca3af"
                                        : "0.4rem solid rgba(255, 255, 255, 0.5)",
                            }}
                            date={item.date}
                            icon={
                                item.logo ? (
                                    <Image
                                        src={item.logo}
                                        alt={`${item.title} logo`}
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                ) : (
                                    <item.icon size={24} />
                                )
                            }
                            iconStyle={{
                                background:
                                    theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                borderRadius: "50%",
                                padding: "4px",
                            }}
                        >
                            <h3 className="font-semibold capitalize">{item.title}</h3>
                            <p className="font-normal !mt-0">{item.location}</p>
                            <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                                {item.description}
                            </p>
                        </VerticalTimelineElementComponent>
                    </React.Fragment>
                ))}
            </VerticalTimelineComponent>
        </section>
    );
};

export default Experience;