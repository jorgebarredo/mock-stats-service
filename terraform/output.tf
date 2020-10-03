output "public-ip" {
  value = aws_instance.mock_stats_service.public_ip
}