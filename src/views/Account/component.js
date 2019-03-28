import React from "react";
import Table from "components/Table/Table.jsx";

export default class Component extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accountnumber: '',
      accounts:[]
    }
  }

  componentDidMount() {
    let { getAllAccount } = this.props
    getAllAccount()
  }
  componentWillReceiveProps(nextProps) {
    let { type, result } = nextProps;
    if (type === 'RETRIEVE_ACCOUNTS_SUCCESSED' || type === 'STORING_ACCOUNTS_SUCCESSED') {
      this.setState({accounts: this.iterateResult(result)})
    }
  }

  iterateResult(result) {
    let data = []
    result.map( item => {
      return data.push([item.accountnumber, item.swiftcode, item.currency])
    })
    return data
  }

  render() {
    return (
      <div>
        {this.state.accounts.length > 0 && 
        <Table
          tableHeaderColor="warning"
          tableHead={["Account Number", "Swift Code", "Currency"]}
          tableData={this.state.accounts}
        />
        }
      </div>
    )
  }
}