import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as servicecatalog from "aws-cdk-lib/aws-servicecatalog";

export class PortfolioStack extends cdk.Stack {
  public readonly portfolio: servicecatalog.Portfolio;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.portfolio = new servicecatalog.Portfolio(this, "Portfolio", {
      displayName: "IT Product Catalog",
      providerName: "Cloud Centre of Excellence (CCoE)",
      description:
        "This portfolio provides you a set of products that you can use",
    });
  }
}
