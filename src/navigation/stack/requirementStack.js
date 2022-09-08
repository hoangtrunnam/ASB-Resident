import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Requirement from "../../views/requirement/index";
import DetailRequirement from "../../views/requirement/DetailRequirement";
import CreateRequirement from "../../views/requirement/CreateRequirement";

const RequirementStack = createStackNavigator({
  Requirement: {
    screen: Requirement
  },
  DetailRequirement: {
    screen: DetailRequirement
  },
  CreateRequirement: {
    screen: CreateRequirement
  }
});

RequirementStack.navigationOptions = ({ navigation }) => {
  let navigationOptions = {};
  if (navigation.state.index > 0) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};
export default RequirementStack;
