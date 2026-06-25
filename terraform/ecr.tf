resource "aws_ecr_repository" "backend" {

  name = "amazona-backend"

  image_scanning_configuration {
    scan_on_push = true
  }

}


resource "aws_ecr_repository" "frontend" {

  name = "amazona-frontend"

  image_scanning_configuration {
    scan_on_push = true
  }

}