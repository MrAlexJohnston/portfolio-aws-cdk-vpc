import { CfnOutput, Stack, type StackProps } from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import { Vpc } from 'aws-cdk-lib/aws-ec2'

export class PortfolioAwsCdkVpcStack extends Stack {
  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const vpc = new Vpc(this, 'PortfolioVpc', {
      vpcName: 'Portfolio',
      maxAzs: 3
    })

    new CfnOutput(this, 'PortfolioVpcId', {
      exportName: 'Portfolio-Vpc-Id',
      value: vpc.vpcId
    })

    const publicSubnetIds = vpc.publicSubnets.map(subnet => subnet.subnetId)
    const privateSubnetIds = vpc.privateSubnets.map(subnet => subnet.subnetId)

    new CfnOutput(this, 'PortfolioVpcPublicSubnetIds', {
      value: publicSubnetIds.join(','),
      exportName: 'Portfolio-Vpc-Public-Subnet-Ids'
    })

    new CfnOutput(this, 'PortfolioVpcPrivateSubnetIds', {
      value: privateSubnetIds.join(','),
      exportName: 'Portfolio-Vpc-Private-Subnet-Ids'
    })
  }
}
