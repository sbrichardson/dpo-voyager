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

import CFloor from "@ff/scene/components/CFloor";

import { IFloor } from "common/types/features";

////////////////////////////////////////////////////////////////////////////////

export default class CVFloor extends CFloor
{
    static readonly typeName: string = "CVFloor";


    fromData(data: IFloor)
    {
        this.ins.copyValues({
            visible: data.visible,
            position: data.position,
            radius: data.size,
            color: data.color,
            opacity: data.opacity,
            receiveShadow: data.receiveShadow,
        });
    }

    toData(): IFloor
    {
        const ins = this.ins;

        return {
            visible: ins.visible.value,
            position: ins.position.cloneValue(),
            size: ins.radius.value,
            color: ins.color.cloneValue(),
            opacity: ins.opacity.value,
            receiveShadow: ins.receiveShadow.value,
        };
    }
}