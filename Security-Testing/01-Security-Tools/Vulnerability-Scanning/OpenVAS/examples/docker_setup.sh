# Docker Quick Start for OpenVAS

docker run --detach \
  --publish 443:443 \
  --publish 9392:9392 \
  --env ADMIN_USERNAME=admin \
  --env ADMIN_PASSWORD=Admin123! \
  --volume openvas-data:/data \
  --name openvas \
  greenbone/openvas

# Wait for initialization (5-10 minutes)
# Then access: https://localhost:9392
# Login with admin / Admin123!
