import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as servicecatalog from "aws-cdk-lib/aws-servicecatalog";
import { RemovalPolicy } from "aws-cdk-lib";

export class S3BucketProduct extends servicecatalog.ProductStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new s3.Bucket(this, "MyBucket", {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: s3.BucketAccessControl.PRIVATE,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
