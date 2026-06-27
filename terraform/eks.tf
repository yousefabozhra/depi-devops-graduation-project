module "eks" {

  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.21"


  cluster_name = "amazona-cluster"

  cluster_version = "1.31"


  vpc_id = module.vpc.vpc_id


  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access = true

  eks_managed_node_groups = {

    amazona_nodes = {

      name = "amazona-node-group"


      instance_types = [
        "t3.micro"
      ]


      min_size = 3

      max_size = 4

      desired_size = 3

    }

  }


  tags = {

    Environment = "production"

    Project = "amazona"

  }

}