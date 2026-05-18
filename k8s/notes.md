<COMMANDS>



<GITHUB>

1. git clone github-repo-url.git
2. 


<NOTES>

MongoDB requires special configuration called a ReplicaSet to run multiple instances properly. Running 2+ mongo pods without that setup causes data corruption. So for now 1 replica is correct for both environments — even in production.
