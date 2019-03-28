import React from "react";
import PropTypes from 'prop-types';
// @material-ui/core components
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Currencies from '../Currencies';
import Account from '../Account';

export default class Component extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      type : 'Individual',
      accountnumber: '',
      swiftcode:'',
      firstname:'',
      lastname:'',
      companyname:'',
      address:'',
      postalcode:'',
      country:'',
      currency:'',
      accounts:[]
    }

    this.submitHandle = this.submitHandle.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let { type, result } = nextProps;
    if (type === 'RETRIEVE_ACCOUNTS_SUCCESSED' || type === 'STORING_ACCOUNTS_SUCCESSED') {
      this.setState({accounts: result})
    }
  }

  submitHandle() {
    const { setAllAccount } = this.props;
    let { accounts, ...other } = this.state
    let data = Array.from(this.state.accounts)
    data.push(other)
    setAllAccount(data)
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <Card>
              <CardHeader color="primary">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={7}>
                    <h4 className={classes.cardTitleWhite}>{this.state.type} Account Form</h4>
                    <p className={classes.cardCategoryWhite}>Complete your bank account form</p>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomDropdown
                      buttonText="Account Type"
                      dropdownHeader="Type of bank account"
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                      }}
                      dropdownList={[
                        "Individual",
                        "Company",
                      ]}
                      onClick={(type) => this.setState({type})}
                    />
                  </GridItem>
                </GridContainer>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      labelText="Account Number"
                      id="account-number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: val => this.setState({accountnumber:val.target.value})
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Swift Code"
                      id="swift-code"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: val => this.setState({swiftcode:val.target.value})
                      }}
                    />
                  </GridItem>
                </GridContainer>
                { this.state.type === 'Individual' ?
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: val => this.setState({firstname:val.target.value})
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: val => this.setState({lastname:val.target.value})
                      }}
                    />
                  </GridItem>
                </GridContainer>
                :
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Company Name"
                      id="company-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: val => this.setState({companyname:val.target.value})
                      }}
                    />
                  </GridItem>
                </GridContainer>
                }
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: val => this.setState({address:val.target.value})
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: val => this.setState({postalcode:val.target.value})
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Currencies onChange={(val) => this.setState(val)} />
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => this.submitHandle()}>Save</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardBody>
                <Account />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
Component.propTypes = {
  classes: PropTypes.object,
}