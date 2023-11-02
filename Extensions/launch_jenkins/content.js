let namespace = prompt("Enter your namespace. Example: joshua-huang");
let boxName =
  prompt(
    'Enter your box name. If left blank, boxName will default to "<NAMESPACE>-devspace"'
  ) || `${namespace}-devspace`;
if (namespace) {
  alert(namespace);
  let jenkinsUrl = `https://jenkins.jx.jenkinsx.management.carta.dev/job/Kubernetes/job/Deploy-Kubernetes-Carta-Web-Next-Gen/parambuild/?CLUSTER=eks-test&NAMESPACE=${namespace}&RELEASE_NAME_OVERRIDE=${boxName}-devspace&FUND_ADMIN_ENABLED=true&FUND_ADMIN_IMAGE_TAG=latest&CARTA_WEB_GIT_REF=master&LLC_CORE_ENABLED=true&LLC_CORE_DB_ENABLED=true&CDS_ENABLED=true&FEP_APP_REGISTRY_SERVICE_ENABLED=TRUE&ADDRESS_SERVICE_ENABLED=TRUE&LLC_STAFF_ENABLED=TRUE`;
  chrome.runtime.sendMessage({ action: "jenkinsUrl", data: jenkinsUrl });
}
