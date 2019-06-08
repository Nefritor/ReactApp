import React from 'react';
import './App.css';

export default class Players extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: props.players,
            editPlayer: -1,
            editing: false,
            showConfirm: false
        };
    }

    addPlayer = () => {
        this.state.players.push({
            name: 'Name',
            number: 'Number',
            position: 'Position'
        });
        this.setState({
            players: this.state.players,
            editPlayer: this.state.players.length - 1,
            editing: true
        });
    };

    handleDelete = () => {
        this.setState({
            players: this.state.players.filter((x, key) => key !== this.state.editPlayer),
            showConfirm: false,
            editPlayer: -1,
            editing: false
        });
    };

    handleEdit = (id) => {
        const tempPlayer = JSON.parse(localStorage.getItem('tempPlayer'))
        if (tempPlayer) {
            let players = this.state.players;
            players[this.state.editPlayer] = tempPlayer;
            this.setState({
                players,
            });
        } else {
            this.handleDelete();
        }
        this.setState({
            editPlayer: id,
            editing: true,
            showConfirm: false
        });
        localStorage.setItem('tempPlayer', JSON.stringify(this.state.players[id]));
    };

    handleSave = (id) => {
        if (id === this.state.editPlayer) {
            this.setState({
                editing: false,
                editPlayer: -1,
                showConfirm: false
            });
        } else {
            this.setState({
                editPlayer: id
            });
        }
    };

    handleConfirmDelete = (id) => {
        this.setState({
            editPlayer: id,
            showConfirm: true,
        });
    };

    handleCancelDelete = () => {
        this.setState({
            editPlayer: -1,
            showConfirm: false,
        });
    };

    handleCancel = () => {
        if (JSON.parse(localStorage.getItem('tempPlayer')) !== null) {
            let players = this.state.players;
            players[this.state.editPlayer] = JSON.parse(localStorage.getItem('tempPlayer'));
            this.setState({
                editing: false,
                editPlayer: -1,
                players,
                showConfirm: false
            });
            localStorage.setItem('tempPlayer', null);
        } else {
            this.handleDelete();
        }
    };

    changeInput(id, elem, value) {
        let players = this.state.players;
        players[id][elem] = value;
        this.setState({
            players
        });
    }

    listElements = (player, key, isEdit) => {
        if (!isEdit) {
            return (
                <div style={{overflow: 'hidden'}}>
                    <p>
                        <b>Name:</b> {player.name}
                    </p>
                    <p>
                        <b>Number:</b> {player.number}
                    </p>
                    <p>
                        <b>Position:</b> {player.position}
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>
                        <input placeholder="Name" value={player.name}
                               onChange={e => this.changeInput(key, 'name', e.target.value)}/>
                    </p>
                    <p>
                        <input placeholder="Number" value={player.number}
                               onChange={e => this.changeInput(key, 'number', e.target.value)}/>
                    </p>
                    <p>
                        <input placeholder="Position" value={player.position}
                               onChange={e => this.changeInput(key, 'position', e.target.value)}/>
                    </p>
                </div>
            )
        }
    };

    playersElement = () => {
        return (this.state.players.map((player, key) => (
            <div className="d-flex-col container player w-200" key={`player-${key}`}>
                <div className="players-info">
                    {this.listElements(player, key, key === this.state.editPlayer && this.state.editing)}
                </div>
                <div className="button" onClick={
                    () => this.state.editing && key === this.state.editPlayer ? this.handleSave(key) : this.handleEdit(key)
                }>{this.state.editing && key === this.state.editPlayer ? 'Save' : 'Edit'}</div>
                <div className="button" onClick={
                    () => this.state.editing ? this.handleCancel() : this.handleConfirmDelete(key)
                }>{this.state.editing && key === this.state.editPlayer ? 'Cancel' : 'Delete'}</div>
            </div>
        )))
    };

    render() {
        return (
            <div>
                <div className="d-flex flex-wrap">
                    {this.playersElement()}
                </div>
                <div className="button"
                     style={{display: !this.state.editing && !this.state.showConfirm ? 'block' : 'none'}}
                     onClick={() => this.addPlayer()}>Add
                </div>
                <div style={{display: this.state.showConfirm ? 'flex' : 'none'}}>
                    <div className="button" onClick={() => this.handleDelete()}>Confirm delete</div>
                    <div className="button" onClick={() => this.handleCancelDelete()}>Cancel</div>
                </div>
            </div>
        )
    }
}