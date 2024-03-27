var defaultSettings = {
  enableAuto: false,
  namespace: "joshua-huang",
  boxName: null,
  cluster: "eks-test",
  fundAdmin: true,
  cartaWeb: true,
  llcCore: true,
  llcCoreDb: true,
  cds: true,
  fepAppRegistryService: true,
  useArgo: false,
};

var namespace = defaultSettings.enableAuto
  ? defaultSettings.namespace
  : prompt("Enter your namespace. Example: joshua-huang", "joshua-huang");
var namespaceQuery = namespace ? `&NAMESPACE=${namespace}` : "";
var boxName = defaultSettings.enableAuto
  ? defaultSettings.boxName
  : prompt(
      "Enter your box name. If left blank, boxName will create a random box"
    ) || null;
var clusterQuery = `&CLUSTER=${defaultSettings.cluster || "eks-test"}`;
var boxnameQuery = boxName ? `&RELEASE_NAME_OVERRIDE=${boxName}` : "";
var fundAdminQuery = `&FUND_ADMIN_ENABLED=true&FUND_ADMIN_IMAGE_TAG=latest`;
var cartaWebQuery = `&CARTA_WEB_GIT_REF=${
  defaultSettings.cartaWeb || "master"
}`;
var llcCoreQuery = defaultSettings.llcCore ? `&LLC_CORE_ENABLED=true` : "";
var llcCoreDbQuery = defaultSettings.llcCoreDb
  ? `&LLC_CORE_DB_ENABLED=true`
  : "";
var cdsQuery = defaultSettings.cds ? `&CDS_ENABLED=true` : "";
var fepAppRegistryServiceQuery = defaultSettings.fepAppRegistryService
  ? `&FEP_APP_REGISTRY_SERVICE_ENABLED=true`
  : "";

var useArgoQuery = `&USE_ARGOCD=${defaultSettings.useArgo}`;

var query = [
  clusterQuery,
  namespaceQuery,
  boxnameQuery,
  fundAdminQuery,
  cartaWebQuery,
  llcCoreQuery,
  llcCoreDbQuery,
  cdsQuery,
  fepAppRegistryServiceQuery,
  useArgoQuery,
].join("");

if (namespace) {
  let jenkinsUrl = `https://jenkins.jx.jenkinsx.management.carta.dev/job/Kubernetes/job/Deploy-Kubernetes-Carta-Web-Next-Gen/parambuild/?${query}`;
  chrome.runtime.sendMessage({ action: "jenkinsUrl", data: jenkinsUrl });
}
