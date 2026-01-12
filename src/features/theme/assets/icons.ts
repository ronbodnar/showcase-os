import { IconMetadata } from "../types"
import { makeIcon } from "../helpers"

import UserSrc from "@sharedIcons/user.png"

import AngularSrc from "@sharedIcons/tech/angular.svg"
import AWSSrc from "@sharedIcons/tech/aws.svg"
import ChartJSSrc from "@sharedIcons/tech/chartjs.svg"
import CSS3Src from "@sharedIcons/tech/css3.svg"
import DockerSrc from "@sharedIcons/tech/docker.svg"
import ExpressComponent from "@sharedIcons/tech/express.svg?react"
import GitSrc from "@sharedIcons/tech/git.svg"
import GithubComponent from "@sharedIcons/tech/github.svg?react"
import GithubActionsSrc from "@sharedIcons/tech/github-actions.svg"
import HTML5Src from "@sharedIcons/tech/html5.svg"
import IntelliJSrc from "@sharedIcons/tech/intellij-idea.svg"
import JasmineSrc from "@sharedIcons/tech/jasmine.svg"
import JavaSrc from "@sharedIcons/tech/java.svg"
import JavaScriptSrc from "@sharedIcons/tech/javascript.svg"
import JQuerySrc from "@sharedIcons/tech/jquery.svg"
import JUnitSrc from "@sharedIcons/tech/junit.svg"
import JupyterSrc from "@sharedIcons/tech/jupyter.svg"
import LinkedInSrc from "@sharedIcons/tech/linkedin.svg"
import LinuxSrc from "@sharedIcons/tech/linux.svg"
import MongoDBSrc from "@sharedIcons/tech/mongodb.svg"
import MySQLSrc from "@sharedIcons/tech/mysql.svg"
import NginxSrc from "@sharedIcons/tech/nginx.svg"
import NodeJSSrc from "@sharedIcons/tech/node.js.svg"
import NumPySrc from "@sharedIcons/tech/numpy.svg"
import PandasSrc from "@sharedIcons/tech/pandas.svg"
import PHPSrc from "@sharedIcons/tech/php.svg"
import PostmanSrc from "@sharedIcons/tech/postman.svg"
import PythonSrc from "@sharedIcons/tech/python.svg"
import ReactSrc from "@sharedIcons/tech/react.svg"
import RxJSSrc from "@sharedIcons/tech/rxjs.svg"
import ScikitLearnSrc from "@sharedIcons/tech/scikit-learn.svg"
import SpringSrc from "@sharedIcons/tech/spring.svg"
import TailwindCSSSrc from "@sharedIcons/tech/tailwind-css.svg"
import TypeScriptSrc from "@sharedIcons/tech/typescript.svg"
import ViteSrc from "@sharedIcons/tech/vite.svg"
import VSCodeSrc from "@sharedIcons/tech/vscode.svg"

// Themes can override these icons if they wish, but they are theme agnostic.
export const defaultIcons: Record<string, IconMetadata> = {
  User: makeIcon(UserSrc),

  Angular: makeIcon(AngularSrc),
  AWS: makeIcon(AWSSrc),
  ChartJS: makeIcon(ChartJSSrc),
  CSS3: makeIcon(CSS3Src),
  Docker: makeIcon(DockerSrc),
  Express: makeIcon(ExpressComponent),
  Git: makeIcon(GitSrc),
  GitHub: makeIcon(GithubComponent),
  GitHubActions: makeIcon(GithubActionsSrc, "GitHub Actions"),
  HTML5: makeIcon(HTML5Src),
  IntelliJ: makeIcon(IntelliJSrc, "IntelliJ IDEA"),
  Jasmine: makeIcon(JasmineSrc),
  Java: makeIcon(JavaSrc),
  JavaScript: makeIcon(JavaScriptSrc),
  JQuery: makeIcon(JQuerySrc),
  JUnit: makeIcon(JUnitSrc),
  Jupyter: makeIcon(JupyterSrc, "Jupyter Notebook"),
  LinkedIn: makeIcon(LinkedInSrc),
  Linux: makeIcon(LinuxSrc),
  MongoDB: makeIcon(MongoDBSrc),
  MySQL: makeIcon(MySQLSrc),
  Nginx: makeIcon(NginxSrc),
  NodeJS: makeIcon(NodeJSSrc),
  NumPy: makeIcon(NumPySrc),
  Pandas: makeIcon(PandasSrc),
  PHP: makeIcon(PHPSrc),
  Postman: makeIcon(PostmanSrc),
  Python: makeIcon(PythonSrc),
  React: makeIcon(ReactSrc),
  RxJS: makeIcon(RxJSSrc),
  ScikitLearn: makeIcon(ScikitLearnSrc, "Scikit-Learn"),
  Spring: makeIcon(SpringSrc, "Spring Ecosystem (Spring Boot, Spring Data, Spring Security)"),
  TailwindCSS: makeIcon(TailwindCSSSrc, "Tailwind CSS"),
  TypeScript: makeIcon(TypeScriptSrc),
  Vite: makeIcon(ViteSrc),
  VSCode: makeIcon(VSCodeSrc, "Visual Studio Code"),
}

export default defaultIcons
