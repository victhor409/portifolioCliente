import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers'
import axios from 'axios'
import React, { Component } from 'react'
import Main from '../Main'


const headerProps = {
    icon: 'clients',
    title: 'Clientes',
    subtitle: 'Cadastro de Clientes Unimed'
}

const baseUrl = 'http://localhost:8080/clientes'

const initialState = {
    cliente: {
        razaoSocial:'',
        cnpj:'',
        tipoRegimeTributario:'',
        email:''
    },
    list: []
}



export default class Cliente extends Component {

   

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ cliente: initialState.cliente })
    }

    save() {
        const cliente = this.state.cliente
        const method = cliente.id ? 'put' : 'post'
        const url = cliente.id ? `${baseUrl}/${cliente.id}` : baseUrl
        axios[method](url, cliente).then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ cliente: initialState.cliente, list })
        })

    }

    getUpdatedList(cliente) {
        const list = this.state.list.filter(u => u.id !== cliente.id)
        if (cliente) list.unshift(cliente)
        return list
    }

    updateField(event) {
        const cliente = { ...this.state.cliente }
        cliente[event.target.name] = event.target.value
        this.setState({ cliente })
    }

    renderForm() {

        return (

            <div className='for'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Razao Social</label>
                            <input type="text" className='form-control'
                                name="razaoSocial"
                                value={this.state.cliente.razaoSocial}
                                onChange={e => this.updateField(e)}
                                placeholder="razao social"
                            >
                            </input>


                        </div>

                    </div>

                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>cnpj</label>
                            <input type="text" className='form-control'
                                name="cnpj"
                                value={this.state.cliente.cnpj}
                                onChange={e => this.updateField(e)}
                                placeholder="cnpj"
                            >
                            </input>


                        </div>

                    </div>

                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Tipo Regime Tributario</label>
                            <input type="text" className='form-control'
                                name="tipoRegimeTributario"
                                value={this.state.cliente.tipoRegimeTributario}
                                onChange={e => this.updateField(e)}
                                placeholder="tipo Regime Tributario"
                            >
                            </input>
                        </div>

                    </div>

                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Email</label>
                            <input type="text" className='form-control'
                                name="email"
                                value={this.state.cliente.email}
                                onChange={e => this.updateField(e)}
                                placeholder="email"
                            >
                            </input>
                        </div>

                    </div>
                    
                </div>

                <hr />

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>

                    </div>

                </div>

            </div>





        )
    }

    load(cliente) {
        this.setState({ cliente })
    }

    remove(cliente) {
        axios.delete(`${baseUrl}/${cliente.id}`).then(resp => {
            const list = this.getUpdatedList(cliente)
            this.setState({ list })
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Razao Social</th>
                        <th>Cnpj</th>
                        <th>Regime Tributario</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(cliente => {
            return(
                <tr key = {cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.razaoSocial}</td>
                    <td>{cliente.cnpj}</td>
                    <td>{cliente.tipoRegimeTributario}</td>
                    <td>{cliente.email}</td>
                    <td>
                        <button className="btn btn-warning">
                            <i className="fa fa-pencil"
                            onClick = {() => this.load(cliente)}></i>
                        </button>
                        <button className="btn btn-danger ml-2">
                            <i className="fa fa-trash"
                            onClick = {() => this.remove(cliente)}></i>
                        </button>

                    </td>

                </tr>
            )
        })
    }





    render() {

        return (

            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}

            </Main>

        )
    }

}