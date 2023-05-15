import { Construct } from "constructs";
import * as servicecatalog from "aws-cdk-lib/aws-servicecatalog";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { readFileSync } from "fs";

export class InstanceProduct extends servicecatalog.ProductStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Create a VPC
    const vpc = new ec2.Vpc(this, "VPC", {
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    // Create a security group for the EC2 instance
    const securityGroup = new ec2.SecurityGroup(
      this,
      "WebserverSecurityGroup",
      {
        vpc: vpc,
      }
    );

    // Lets use the security group to allow inbound traffic on specific ports
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allows HTTP access from Anywhere"
    );

    // Create the EC2 instance
    const ec2Instance = new ec2.Instance(this, "simple-instance-1", {
      vpc: vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: securityGroup,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
    });

    // Load user data script
    const userDataScript = readFileSync("lib/scripts/user-data.sh", "utf8");

    // Add user data to the EC2 instance
    ec2Instance.addUserData(userDataScript);
  }
}
