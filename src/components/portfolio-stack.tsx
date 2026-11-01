import { CodeXml, Database, Palette } from "lucide-react";
import { siC, siCplusplus, siPython, siJavascript, siTypescript, siHtml5, siCss, siReact, siNodedotjs, siExpress, siMongodb, siGit, siGithub, siFigma, type SimpleIcon } from "simple-icons";
import { MotionSurface } from "./portfolio-motion";

const groups: { name: string; items: { name: string; icon?: SimpleIcon; fallback?: typeof Database; tone: string }[] }[] = [
  { name: "Programming", items: [
    { name: "C++", icon: siCplusplus, tone: "cool" }, { name: "C", icon: siC, tone: "cool" },
    { name: "Python", icon: siPython, tone: "warm" }, { name: "SQL", fallback: Database, tone: "mint" },
    { name: "JavaScript", icon: siJavascript, tone: "warm" }, { name: "TypeScript", icon: siTypescript, tone: "cool" },
  ] },
  { name: "Frontend", items: [
    { name: "HTML", icon: siHtml5, tone: "ember" }, { name: "CSS", icon: siCss, tone: "cool" }, { name: "React.js", icon: siReact, tone: "mint" },
  ] },
  { name: "Backend & Database", items: [
    { name: "Node.js", icon: siNodedotjs, tone: "mint" }, { name: "Express.js", icon: siExpress, tone: "neutral" }, { name: "MongoDB", icon: siMongodb, tone: "mint" },
  ] },
  { name: "Tools & Design", items: [
    { name: "Git", icon: siGit, tone: "ember" }, { name: "GitHub", icon: siGithub, tone: "neutral" },
    { name: "VS Code", fallback: CodeXml, tone: "cool" }, { name: "Canva", fallback: Palette, tone: "mint" }, { name: "Figma", icon: siFigma, tone: "ember" },
  ] },
];

export function TechStack() {
  return <div className="stack-groups">{groups.map((group, groupIndex) => <div key={group.name} className="stack-group">
    <div className="stack-label"><span className="stack-number font-display">0{groupIndex + 1}</span><h3>{group.name}</h3><span className="stack-count font-display">{String(group.items.length).padStart(2, "0")} TECHNOLOGIES</span><span className="stack-rule" /></div>
    <div className="tech-grid">{group.items.map((tech, index) => {
      const Fallback = tech.fallback ?? CodeXml;
      return <div key={tech.name} className="reveal" style={{ transitionDelay: `${index * 65}ms` }}><MotionSurface className={`tech-tile tech-${tech.tone}`}>
        <span className="tech-index font-display" aria-hidden="true">{String(groupIndex + 1).padStart(2, "0")}.{String(index + 1).padStart(2, "0")}</span>
        <span className="tech-logo" aria-hidden="true">{tech.icon ? <svg viewBox="0 0 24 24" fill="currentColor"><path d={tech.icon.path} /></svg> : <Fallback />}</span>
        <span className="tech-name">{tech.name}</span><span className="tech-circuit" aria-hidden="true"><i /><i /><i /></span>
      </MotionSurface></div>;
    })}</div>
  </div>)}</div>;
}