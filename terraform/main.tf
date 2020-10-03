resource "aws_instance" "mock_stats_service" {
  ami           = "ami-0a669382ea0feb73a"
  instance_type = "t2.micro"

  user_data = <<EOF
#!/bin/bash
cd /tmp
echo '#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
source ~/.bashrc
nvm i 12.13.0
curl -o- -L https://yarnpkg.com/install.sh | bash
sudo yum install -y ruby wget
cd /home/ec2-user
sudo ln -s /home/ec2-user/.nvm/versions/node/v12.13.0/bin/node /usr/bin
sudo ln -s /home/ec2-user/.nvm/versions/node/v12.13.0/bin/npm /usr/bin
sudo ln -s /home/ec2-user/.yarn/bin/yarn /usr/bin
wget https://jbg-mock-stats-service-code.s3.eu-west-2.amazonaws.com/mock-stats-service-main.zip
unzip mock-stats-service-main.zip
cd mock-stats-service-main/src/
npm install
node index.js' >> init.sh
chmod +x init.sh
/bin/su -c "/tmp/init.sh" - ec2-user
rm init.sh
EOF

  tags = {
    Name = "Mock Stats Service"
  }

  vpc_security_group_ids = [aws_security_group.allow_port_3000.id]
}

resource "aws_security_group" "allow_port_3000" {
  name        = "allow_port_3000"
  description = "Allow Node.js default port"

  ingress {
    description = "Node js default port"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_port_3000"
  }
}