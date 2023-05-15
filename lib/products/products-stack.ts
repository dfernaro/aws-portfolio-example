import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as servicecatalog from "aws-cdk-lib/aws-servicecatalog";
import * as iam from "aws-cdk-lib/aws-iam";
import { S3BucketProduct } from "./bucket-product";
import { InstanceProduct } from "./instance-product";
import { PortfolioStack } from "../portfolio/portfolio-stack";
import { StackProps } from "aws-cdk-lib";

interface IProductsStackProps extends StackProps {
  readonly portfolioStack: PortfolioStack;
}

export class ProductsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IProductsStackProps) {
    super(scope, id, props);

    const launchRole = new iam.Role(this, "LaunchRole", {
      assumedBy: new iam.ServicePrincipal("servicecatalog.amazonaws.com"),
    });

    const product1 = new servicecatalog.CloudFormationProduct(
      this,
      "Product 1",
      {
        productName: "My S3 Bucket product",
        owner: "CCoE",
        productVersions: [
          {
            productVersionName: "v1",
            cloudFormationTemplate:
              servicecatalog.CloudFormationTemplate.fromProductStack(
                new S3BucketProduct(this, "S3BucketProduct")
              ),
          },
        ],
      }
    );
    props.portfolioStack.portfolio.addProduct(product1);
    props.portfolioStack.portfolio.setLocalLaunchRole(product1, launchRole);

    const product2 = new servicecatalog.CloudFormationProduct(
      this,
      "Product 2",
      {
        productName: "My EC2 instance website",
        owner: "CCoE",
        productVersions: [
          {
            productVersionName: "v1",
            cloudFormationTemplate:
              servicecatalog.CloudFormationTemplate.fromProductStack(
                new InstanceProduct(this, "InstanceProduct")
              ),
          },
        ],
      }
    );
    props.portfolioStack.portfolio.addProduct(product2);
    props.portfolioStack.portfolio.setLocalLaunchRole(product2, launchRole);
  }
}
