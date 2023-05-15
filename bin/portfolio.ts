#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PortfolioStack } from "../lib/portfolio/portfolio-stack";
import { ProductsStack } from "../lib/products/products-stack";

const app = new cdk.App();
const portfolioStack = new PortfolioStack(app, "PortfolioStack", {
  env: { account: "REPLACE_ME", region: "eu-west-1" },
});

new ProductsStack(app, "ProductsStack", {
  env: { account: "REPLACE_ME", region: "eu-west-1" },
  portfolioStack: portfolioStack,
});
