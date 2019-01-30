/**
 * 3D Foundation Project
 * Copyright 2018 Smithsonian Institution
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import System from "@ff/graph/System";
import CSelection from "@ff/graph/components/CSelection";

import { customElement, html, property, PropertyValues } from "@ff/ui/CustomElement";
import List from "@ff/ui/List";
import "@ff/ui/Icon";

import CVPresentation from "../../explorer/components/CVPresentation";

import CVPresentationController, {
    IPresentationEvent,
    IActivePresentationEvent
} from "../../explorer/components/CVPresentationController";

////////////////////////////////////////////////////////////////////////////////

@customElement("sv-presentation-list")
class PresentationList extends List<CVPresentation>
{
    @property({ attribute: false })
    system: System = null;

    protected presentations: CVPresentationController = null;
    protected selection: CSelection = null;

    protected firstConnected()
    {
        super.firstConnected();
        this.classList.add("sv-presentation-list");

        this.presentations = this.system.getMainComponent(CVPresentationController, true);
        this.selection = this.system.getMainComponent(CSelection, true);
    }

    protected connected()
    {
        super.connected();

        this.selection.selectedComponents.on(CVPresentation, this.performUpdate, this);
        this.presentations.on<IPresentationEvent>("presentation", this.performUpdate, this);
        this.presentations.on<IActivePresentationEvent>("active-presentation", this.performUpdate, this);
    }

    protected disconnected()
    {
        this.selection.selectedComponents.off(CVPresentation, this.performUpdate, this);
        this.presentations.off<IPresentationEvent>("presentation", this.performUpdate, this);
        this.presentations.off<IActivePresentationEvent>("active-presentation", this.performUpdate, this);

        super.disconnected();
    }

    protected update(props: PropertyValues)
    {
        this.data = this.system.components.getArray(CVPresentation);
        super.update(props);
    }

    protected renderItem(component: CVPresentation)
    {
        const isActive = component === this.presentations.activePresentation;
        return html`<div class="ff-flex-row"><ff-icon name=${isActive ? "check" : "empty"}></ff-icon>
            <ff-text class="ff-ellipsis">${component.displayName}</ff-text></div>`;
    }

    protected isItemSelected(component: CVPresentation)
    {
        return this.selection.selectedComponents.contains(component);
    }

    protected onClickItem(event: MouseEvent, component: CVPresentation)
    {
        this.presentations.activePresentation = component;
        this.selection.selectComponent(component);
    }
}