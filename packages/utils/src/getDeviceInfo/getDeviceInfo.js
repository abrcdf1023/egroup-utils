import MobileDetect from 'mobile-detect';

export default function getDeviceInfo() {
  const md = new MobileDetect(window.navigator.userAgent);
  const rules = MobileDetect._impl.mobileDetectRules;
  const sections = ['phones', 'tablets', 'oss', 'uas', 'utils'];
  const outcome = [];
  outcome.push({ 'phone()': md.phone() || '' });
  outcome.push({ 'tablet()': md.tablet() || '' });
  outcome.push({ 'mobile()': md.mobile() || '' });
  outcome.push({ 'os()': md.os() || '' });
  outcome.push({ 'userAgent()': md.userAgent() || '' });
  outcome.push({ 'mobileGrade()': md.mobileGrade() || '' });
  outcome.push({ 'smaller side': MobileDetect._impl.getDeviceSmallerSide() });
  sections.forEach(function(section) {
    Object.keys(rules[section])
      .filter(key => md.is(key))
      .forEach(function(key) {
        outcome.push({ key: `is(${key})`, val: true });
      });
  });
  Object.keys(rules.props).forEach(function(propKey) {
    let version;
    version = md.versionStr(propKey);
    if (version) {
      outcome.push({
        key: `versionStr(${propKey})`,
        val: version
      });
    }
    version = md.version(propKey);
    if (version) {
      outcome.push({ key: `version(${propKey})`, val: version });
    }
  });
}
